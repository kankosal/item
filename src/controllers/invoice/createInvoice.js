import { Invoice } from '../../models';

const createInvoice = async ({ teamName }) => {
  const invoice = await Invoice.create({
    team_name: teamName,
    created_at: Date.now(),
  });

  return {
    team: invoice,
    status: 'success',
  };
};

export default createInvoice;
