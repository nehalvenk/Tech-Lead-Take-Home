import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, default: '', trim: true },
    affiliation: { type: String, default: '', trim: true },
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
    doi:      { type: String, default: '', trim: true },
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
