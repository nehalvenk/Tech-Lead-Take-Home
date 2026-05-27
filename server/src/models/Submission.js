import mongoose from 'mongoose';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthorSchema = new mongoose.Schema(
  {
    firstName:   { type: String, required: true, trim: true, maxlength: 100 },
    lastName:    { type: String, required: true, trim: true, maxlength: 100 },
    email:       {
      type: String, default: '', trim: true, maxlength: 254,
      validate: { validator: (v) => !v || EMAIL_RE.test(v), message: 'Invalid email format' },
    },
    affiliation: { type: String, default: '', trim: true, maxlength: 200 },
  },
  { _id: false },
);

const SubmissionSchema = new mongoose.Schema(
  {
    manuscriptNumber: { type: Number, unique: true },
    title: { type: String, required: true, trim: true, maxlength: 300 },
    researchObjectType: {
      type: String,
      enum: ['Software', 'Dataset', 'Article', 'Preprint', 'Other'],
      default: 'Software',
    },
    authors: { type: [AuthorSchema], default: [] },
    doi: {
      type: String, default: '', trim: true,
      validate: { validator: (v) => !v || /^10\.\d{4,}\/\S+$/.test(v), message: 'DOI must be in the format 10.XXXX/suffix' },
    },
    abstract: { type: String, default: '', trim: true, maxlength: 3000 },
    status: {
      type: String,
      enum: ['unsubmitted', 'submitted', 'published'],
      default: 'unsubmitted',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Auto-increment manuscriptNumber on create
SubmissionSchema.pre('save', async function (next) {
  if (this.isNew) {
    const last = await this.constructor.findOne({}, {}, { sort: { manuscriptNumber: -1 } });
    this.manuscriptNumber = last ? last.manuscriptNumber + 1 : 4500;
  }
  next();
});

export default mongoose.model('Submission', SubmissionSchema);
