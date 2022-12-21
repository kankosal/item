import { Team } from '../../models';

const findTeam = async (id) => {
  const team = await Team.findById(id);
  if (!team) throw new Error('Team does not exist.');

  return team || {};
};

export default findTeam;
