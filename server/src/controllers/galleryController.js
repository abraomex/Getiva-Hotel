import { GalleryImage } from '../models/GalleryImage.js'

// Public: GET /api/gallery
export async function getGallery(req, res, next) {
  try {
    const { category } = req.query
    const query = { published: true }

    if (category && category !== 'all') {
      query.category = category
    }

    const images = await GalleryImage.find(query).sort({ sortOrder: 1, createdAt: -1 })
    res.json({ success: true, count: images.length, data: images })
  } catch (err) {
    next(err)
  }
}

// Admin: GET /api/admin/gallery
export async function adminGetGallery(req, res, next) {
  try {
    const images = await GalleryImage.find().sort({ sortOrder: 1, createdAt: -1 })
    res.json({ success: true, count: images.length, data: images })
  } catch (err) {
    next(err)
  }
}

// Admin: POST /api/admin/gallery
export async function adminCreateGallery(req, res, next) {
  try {
    const image = await GalleryImage.create(req.body)
    res.status(201).json({ success: true, message: 'Gallery image added', data: image })
  } catch (err) {
    next(err)
  }
}

// Admin: PATCH /api/admin/gallery/:id
export async function adminUpdateGallery(req, res, next) {
  try {
    const { id } = req.params
    const image = await GalleryImage.findByIdAndUpdate(id, req.body, { new: true })

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' })
    }

    res.json({ success: true, message: 'Image updated', data: image })
  } catch (err) {
    next(err)
  }
}

// Admin: DELETE /api/admin/gallery/:id
export async function adminDeleteGallery(req, res, next) {
  try {
    const { id } = req.params
    const image = await GalleryImage.findByIdAndDelete(id)

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' })
    }

    res.json({ success: true, message: 'Gallery image removed' })
  } catch (err) {
    next(err)
  }
}
