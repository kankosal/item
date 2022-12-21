import { Invoice } from '../../models';

const showInvoice = async (id) => {
  const invoice = await Invoice.findById(id);
  if (!invoice) throw new Error('Invoice does not exist.');

  return invoice || {};
};

export default showInvoice;
