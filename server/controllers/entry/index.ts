import { Request, Response } from "express";
import { format } from "date-fns";

import EntryModel from "../../models/entry";
import { errorMessage } from "@/store/slices/ui";

export const createEntry = async (req: Request, res: Response) => {
  try {
    const { title, description, deadline } = req.body;
    const { user } = req;

    const newEntry = new EntryModel({
      //@ts-ignore-next-line`
      userId: user?.id,
      title,
      description,
      deadline,
      completed: false,
      categories: [],
      status: "pending",
      createdAt: format(new Date(), "dd/MM/yy"),
    });

    await newEntry.save();
    await getEntries(req, res);
  } catch (err) {
    console.error("Error creating an entry:", err);
    const errorResponse = {
      error: "Internal Server Error",
    };
    res.status(500).json(errorResponse);
  }
};

export const getEntries = async (req: Request, res: Response) => {
  const { user } = req;
  try {
    //@ts-ignore-next-line
    const entries = await EntryModel.find({ userId: user?.id });
    if (!entries) {
      res.status(400).json({ error: "Entries not found" });
    }
    res.status(200).json(entries);
  } catch (err) {
    console.error("Error fetching entries:", err);
    const errorResponse = {
      error: "Internal Server Error",
    };
    res.status(500).json(errorResponse);
  }
};

export const updateEntry = async (req: Request, res: Response) => {
  const { _id, status } = req.body;
  try {
    const updatedEntry = await EntryModel.findOneAndUpdate(
      { _id: _id },
      { status: status },
      { new: true }
    );
    if (!updatedEntry) {
      const errorResponse = {
        error: "Entry not found",
      };
      return res.status(404).json(errorResponse);
    }
    await updatedEntry.save();
    await getEntries(req, res);
  } catch (err) {
    console.error("Error updating an entry:", err);
    const errorResponse = {
      error: err || "Internal Server Error",
    };
    res.status(500).json(errorResponse);
  }
};

export default { createEntry, getEntries };
