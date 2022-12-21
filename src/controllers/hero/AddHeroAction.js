import { Hero } from '../../models';

const AddHeroAction = async ({ heroName, isActive, roleName, teamId }) => {
  const hero = await Hero.create({
    hero_name: heroName,
    is_active: isActive,
    role_name: roleName,
    created_at: Date.now(),
    team_id: teamId,
  });

  return {
    hero,
    status: 'success',
  };
};

export default AddHeroAction;
