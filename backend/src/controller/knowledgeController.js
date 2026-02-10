import KnowledgeItem from "../models/knowledgeItem.js";
import { summarizeContent, generateTags } from "../services/geminiService.js";


export const createKnowledgeItem = async (req, res) => {
  try {
    // Add user to body
    req.body.user = req.user.id;

    // 1. Store human data first
    const item = await KnowledgeItem.create(req.body);

    // 2. Fire-and-forget AI processing
    (async () => {
      try {
        const [summary, autoTags] = await Promise.all([
          summarizeContent(item.content),
          generateTags(item.content),
        ]);

        item.ai = {
          summary,
          autoTags,
          lastProcessedAt: new Date(),
        };

        // Merge user tags + AI tags (no overwrites)
        item.tags = Array.from(new Set([...item.tags, ...autoTags]));

        await item.save();
      } catch (err) {
        console.error("AI processing failed:", err.message);
      }
    })();

    // 3. Respond immediately
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getAllKnowledgeItems = async (req, res) => {
  try {
    // Filter by user
    const items = await KnowledgeItem.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ items })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
};

export const getKnowledgeItemById = async (req, res) => {
  try {
    const item = await KnowledgeItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Check for user
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    res.status(200).json(item);

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteKnowledgeItem = async (req, res) => {
  try {
    const item = await KnowledgeItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check for user
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    await item.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateKnowledgeItem = async (req, res) => {
  try {
    let item = await KnowledgeItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check for user
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    item = await KnowledgeItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};