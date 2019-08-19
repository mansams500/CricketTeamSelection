import { CreateTeamModule } from './create-team.module';

describe('CreateTeamModule', () => {
  let createTeamModule: CreateTeamModule;

  beforeEach(() => {
    createTeamModule = new CreateTeamModule();
  });

  it('should create an instance', () => {
    expect(createTeamModule).toBeTruthy();
  });
});
