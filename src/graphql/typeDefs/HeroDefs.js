import { gql } from 'apollo-server-express';

const HeroInputFields = `
  heroName: String!
  isActive: Boolean!
  roleName: String!
  teamId: String!
`;

const heroDefs = gql`
  type Team {
    id: ID!
    teamName: String
    createdAt: Float
  }

  type Hero {
    id: ID!
    heroName: String
    isActive: Boolean
    roleName: String
    teamId: String
    createdAt: Float
    updatedAt: Float
    deletedAt: Float
    team: Team
  }

  type HeroListResponse {
    heroes: [Hero]!
    pagination: Pagination
  }

  type HeroResponse {
    status: String
    hero: Hero
  }

  input HeroFilterInput {
    startDate: String
    endDate: String
    roleName: String
  }

  input HeroInput {
    ${HeroInputFields}
  }

  input UpdateHeroInput {
    id: ID!
    ${HeroInputFields}
  }

  input TeamInput {
   teamName: String
  }

  type TeamResponse {
    status: String
    team: Team
  }

  extend type Mutation {
    createHero(input: HeroInput): HeroResponse
    updateHero(input: UpdateHeroInput): HeroResponse
    createTeam(input: TeamInput): TeamResponse
  }

  extend type Query {
    listHero(
      filter: HeroFilterInput
      pager: PagerInput!
    ): HeroListResponse

    team(id: ID!): Team
  }
`;

export default heroDefs;
