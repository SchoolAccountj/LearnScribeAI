import express, { Router } from 'express';
import serverless from 'serverless-http';
import { storage } from '../../server/storage';
import { insertExerciseSchema, insertQuestionSchema, subjectSchema } from "../../shared/schema";
import multer from 'multer';
import { PDFDocument } from 'pdf-lib';

const api = express();
const router = Router();

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files are allowed"));
    } else {
      cb(null, true);
    }
  }
});

// PDF Routes
router.post("/pdf/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const pdfBytes = req.file.buffer;
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const text = (await Promise.all(
      pdfDoc.getPages().map(page => page.getText())
    )).join(" ");

    const result = await storage.createExercise({
      title: req.body.title || "Untitled Exercise",
      content: text,
      blanks: [],
      answers: []
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error processing PDF" });
  }
});

// Q&A Routes
router.post("/questions", async (req, res) => {
  try {
    const data = insertQuestionSchema.parse(req.body);
    const subject = subjectSchema.parse(data.subject);

    const question = await storage.createQuestion({
      ...data,
      subject
    });

    res.json(question);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error creating question" });
  }
});

router.get("/questions", async (_req, res) => {
  const questions = await storage.listQuestions();
  res.json(questions);
});

api.use('/api/', router);
export const handler = serverless(api);
