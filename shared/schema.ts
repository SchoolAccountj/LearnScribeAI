import { pgTable, text, serial, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  blanks: json("blanks").$type<string[]>().notNull(),
  answers: json("answers").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  subject: text("subject").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  explanation: text("explanation").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertExerciseSchema = createInsertSchema(exercises).omit({ 
  id: true,
  createdAt: true 
});

export const insertQuestionSchema = createInsertSchema(questions).omit({ 
  id: true,
  createdAt: true 
});

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export const subjects = [
  // Science subjects
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "General Science",
  // ELA subjects
  "Literature",
  "Grammar",
  "Writing",
  "Reading Comprehension",
  "Vocabulary"
] as const;

export const subjectSchema = z.enum(subjects);