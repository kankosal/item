import { Hero } from '../../models';

const UpdateHeroAction = async ({ id, heroName, isActive, roleName }) => {
  const hero = await Hero.findOneAndUpdate(
    { _id: id },
    {
      hero_name: heroName,
      is_active: isActive,
      role_name: roleName,
    }
  );

  hero.updated_at = Date.now();
  const _hero = await hero.save();

  return {
    hero: _hero,
    status: 'success',
  };
};

export default UpdateHeroAction;
