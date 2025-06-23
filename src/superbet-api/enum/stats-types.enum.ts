export enum LiveEventSubtype {
  None = 0,
  RedCard = 1,
  YellowCard = 2,
  YellowRedCard = 3,
  GoalFreeKick = 4,
  GoalHeader = 5,
  OwnGoal = 6,
  PenaltyGoal = 7,
  RegularGoal = 8,
}

export enum LiveEventType {
  Unknown = 0,
  Card = 1,
  EndMatch = 2,
  ExtraMinute = 3,
  Goal = 4,
  InjuryTimeout = 5,
  PenaltyMissed = 6,
  PeriodInfo = 7,
  ShotBlocked = 8,
  ShotOffTarget = 9,
  ShotOnTarget = 10,
  StartMatch = 11,
  Substitution = 12,
  VAR = 13,
}
