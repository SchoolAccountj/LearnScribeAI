import type { Express } from "express";
import { createServer } from "http";
import multer from "multer";
import { storage } from "./storage";
import { insertExerciseSchema, insertQuestionSchema, subjectSchema } from "@shared/schema";
import { PDFDocument } from "pdf-lib";

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

export function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  // PDF Routes
  app.post("/api/pdf/upload", upload.single("pdf"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const pdfBytes = req.file.buffer;
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const text = (await Promise.all(
        pdfDoc.getPages().map(page => page.getText())
      )).join(" ");

      // Just extract the text, no AI processing
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

  app.patch("/api/exercises/:id", async (req, res) => {
    try {
      const exercise = await storage.getExercise(Number(req.params.id));
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }

      const data = insertExerciseSchema.parse(req.body);
      const updated = await storage.updateExercise(exercise.id, data);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Error updating exercise" });
    }
  });

  app.get("/api/exercises", async (_req, res) => {
    const exercises = await storage.listExercises();
    res.json(exercises);
  });

  app.get("/api/exercises/:id", async (req, res) => {
    const exercise = await storage.getExercise(Number(req.params.id));
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.json(exercise);
  });

  // Q&A Routes
  app.post("/api/questions", async (req, res) => {
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

  app.get("/api/questions", async (_req, res) => {
    const questions = await storage.listQuestions();
    res.json(questions);
  });

  return httpServer;
}