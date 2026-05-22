const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files allowed'), false);
    }
  }
});

// In-memory CV store
const cvStore = new Map();

// Save CV
router.post('/save', async (req, res) => {
  try {
    const { cvData, userId } = req.body;

    if (!cvData) {
      return res.status(400).json({ error: 'CV data is required' });
    }

    const cvId = `cv_${Date.now()}`;
    const cv = {
      id: cvId,
      userId: userId || 'anonymous',
      data: cvData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    cvStore.set(cvId, cv);

    res.json({
      success: true,
      cvId,
      message: 'CV saved successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save CV' });
  }
});

// Get CV
router.get('/:cvId', (req, res) => {
  const cv = cvStore.get(req.params.cvId);
  if (!cv) {
    return res.status(404).json({ error: 'CV not found' });
  }
  res.json({ cv });
});

// Parse uploaded PDF with AI (mock implementation)
router.post('/parse-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // In production: use OpenAI or another AI service to parse the PDF
    // For now, return mock parsed data
    const mockParsedData = {
      personalInfo: {
        firstName: 'Extracted',
        lastName: 'Name',
        jobTitle: 'Software Engineer',
        email: 'extracted@example.com',
        phone: '+1 (555) 000-0000',
        location: 'City, Country',
        website: '',
        linkedin: '',
        summary: 'Extracted professional summary from the uploaded CV.',
        photo: null
      },
      experiences: [
        {
          id: Date.now(),
          jobTitle: 'Senior Developer',
          company: 'Extracted Company',
          location: 'Remote',
          startDate: '2021-01',
          endDate: '',
          current: true,
          description: 'Extracted job description and responsibilities.'
        }
      ],
      educations: [
        {
          id: Date.now() + 1,
          degree: 'B.S. Computer Science',
          school: 'Extracted University',
          location: '',
          startDate: '2015-09',
          endDate: '2019-05',
          gpa: ''
        }
      ],
      skills: [
        { id: Date.now() + 2, name: 'JavaScript', level: 80 },
        { id: Date.now() + 3, name: 'Python', level: 75 },
        { id: Date.now() + 4, name: 'React', level: 85 }
      ]
    };

    res.json({
      success: true,
      data: mockParsedData,
      message: 'PDF parsed successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse PDF' });
  }
});

// Generate PDF
router.post('/generate-pdf', async (req, res) => {
  try {
    const { cvData } = req.body;

    // In production: use puppeteer or html-pdf to generate PDF
    // For now, return a mock response
    res.json({
      success: true,
      message: 'PDF generation initiated',
      downloadUrl: '/api/cv/download/mock_cv.pdf'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

module.exports = router;
