import { model, Model, Schema} from 'mongoose';
import { ITransactions } from '../typings/model/transaction';

const transactionsSchema: Schema<ITransactions> = new Schema({
  user: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    // required: true
  },
  referenceId: {
    type: String,
    // required: true
  },
	paymentTransferRef:{
    type: String,
	},
  date: {
    type: Date,
    default: Date.now
  }
},
  { timestamps: true }
);

export const Transactions: Model<ITransactions> = model<ITransactions>(
  'Transactions',
   transactionsSchema
);

