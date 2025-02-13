import { Exercise, InsertExercise, Question, InsertQuestion } from "@shared/schema";

export interface IStorage {
  // Exercise methods
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  updateExercise(id: number, exercise: InsertExercise): Promise<Exercise>;
  getExercise(id: number): Promise<Exercise | undefined>;
  listExercises(): Promise<Exercise[]>;

  // Question methods
  createQuestion(question: InsertQuestion): Promise<Question>;
  getQuestion(id: number): Promise<Question | undefined>;
  listQuestions(): Promise<Question[]>;
}

export class MemStorage implements IStorage {
  private exercises: Map<number, Exercise>;
  private questions: Map<number, Question>;
  private exerciseId: number;
  private questionId: number;

  constructor() {
    this.exercises = new Map();
    this.questions = new Map();
    this.exerciseId = 1;
    this.questionId = 1;
  }

  async createExercise(exercise: InsertExercise): Promise<Exercise> {
    const id = this.exerciseId++;
    const newExercise: Exercise = {
      ...exercise,
      id,
      createdAt: new Date()
    };
    this.exercises.set(id, newExercise);
    return newExercise;
  }

  async updateExercise(id: number, exercise: InsertExercise): Promise<Exercise> {
    const existingExercise = this.exercises.get(id);
    if (!existingExercise) {
      throw new Error("Exercise not found");
    }
    const updatedExercise: Exercise = {
      ...existingExercise,
      ...exercise
    };
    this.exercises.set(id, updatedExercise);
    return updatedExercise;
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async listExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const id = this.questionId++;
    const newQuestion: Question = {
      ...question,
      id,
      createdAt: new Date()
    };
    this.questions.set(id, newQuestion);
    return newQuestion;
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    return this.questions.get(id);
  }

  async listQuestions(): Promise<Question[]> {
    return Array.from(this.questions.values());
  }
}

export const storage = new MemStorage();