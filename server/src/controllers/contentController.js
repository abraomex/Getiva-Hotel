import { SiteContent } from '../models/SiteContent.js'

// Public: GET /api/content/:section
export async function getContentBySection(req, res, next) {
  try {
    const { section } = req.params
    const content = await SiteContent.findOne({ section: section.toLowerCase() })

    if (!content) {
      return res.status(404).json({ success: false, message: 'Section content not found' })
    }

    res.json({ success: true, data: content.data })
  } catch (err) {
    next(err)
  }
}

// Admin: PUT /api/admin/content/:section
export async function adminUpdateContent(req, res, next) {
  try {
    const { section } = req.params
    const updated = await SiteContent.findOneAndUpdate(
      { section: section.toLowerCase() },
      {
        section: section.toLowerCase(),
        data: req.body,
        updatedBy: req.user?._id,
      },
      { upsert: true, new: true }
    )

    res.json({ success: true, message: 'Content updated', data: updated.data })
  } catch (err) {
    next(err)
  }
}
