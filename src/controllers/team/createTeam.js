import { Team } from '../../models';

const createTeam = async ({ teamName }) => {
  const team = await Team.create({
    team_name: teamName,
    created_at: Date.now(),
  });

  return {
    team,
    status: 'success',
  };
};

export default createTeam;
