import TeamIn from '../interfaces/team.interface';
import GameIn from '../interfaces/game.interface';
import TableIn from '../interfaces/table.interface';

export default class Calculator {
  static table(data: TeamIn[], location: string) {
    const table = data.map((team: TeamIn) => ({
      name: team.teamName,
      totalPoints: Calculator.calcPoints(team, location),
      totalGames: Calculator.calcGames(team, location),
      totalVictories: Calculator.calcVictories(team, location),
      totalDraws: Calculator.calcDraws(team, location),
      totalLosses: Calculator.calcLosses(team, location),
      goalsFavor: Calculator.calcGoalsFav(team, location),
      goalsOwn: Calculator.calcGoalsOwn(team, location),
      goalsBalance: Calculator.calcGoalsBala(team, location),
      efficiency: Calculator.calcEfi(team, location),
    }));

    return table;
  }

  static calcGames(team: TeamIn, location: string) {
    const homeGame = [
      ...team.homeTeam.map((game: GameIn) => game.homeTeamGoals),
    ].length;
    const awayGame = [
      ...team.awayTeam.map((game: GameIn) => game.awayTeamGoals),
    ].length;

    if (location === 'home') return homeGame;
    if (location === 'away') return awayGame;
    return homeGame + awayGame;
  }

  static calcVictories(team: TeamIn, location: string) {
    const homeWin = team.homeTeam
      .reduce((wins: number, game: GameIn) => (game.homeTeamGoals > game.awayTeamGoals
        ? wins + 1 : wins + 0), 0);
    const awayWin = team.awayTeam
      .reduce((wins: number, game: GameIn) => (game.awayTeamGoals > game.homeTeamGoals
        ? wins + 1 : wins + 0), 0);

    switch (location) {
      case 'home':
        return !homeWin ? 0 : homeWin;
      case 'away':
        return !awayWin ? 0 : awayWin;
      default:
        return homeWin + awayWin;
    }
  }

  static calcLosses(team: TeamIn, location: string) {
    const homeLose = team.homeTeam
      .reduce((lose: number, game: GameIn) => (game.awayTeamGoals > game.homeTeamGoals
        ? lose + 1 : lose + 0), 0);
    const awayLose = team.awayTeam
      .reduce((lose: number, game: GameIn) => (game.homeTeamGoals > game.awayTeamGoals
        ? lose + 1 : lose + 0), 0);

    switch (location) {
      case 'home':
        return !homeLose ? 0 : homeLose;
      case 'away':
        return !awayLose ? 0 : awayLose;
      default:
        return homeLose + awayLose;
    }
  }

  static calcDraws(team: TeamIn, location: string) {
    return Calculator.calcGames(team, location)
        - (Calculator.calcVictories(team, location)
        + Calculator.calcLosses(team, location));
  }

  static calcGoalsFav(team: TeamIn, location: string) {
    const homeGoals = team.homeTeam
      .reduce((goals: number, game: GameIn) => goals + game.homeTeamGoals, 0);
    const awayGoals = team.awayTeam
      .reduce((goals: number, game: GameIn) => goals + game.awayTeamGoals, 0);

    switch (location) {
      case 'home':
        return homeGoals;
      case 'away':
        return awayGoals;
      default:
        return homeGoals + awayGoals;
    }
  }

  static calcGoalsOwn(team: TeamIn, location: string) {
    const homeGoals = team.homeTeam
      .reduce((goals: number, game: GameIn) => goals + game.awayTeamGoals, 0);
    const awayGoals = team.awayTeam
      .reduce((goals: number, game: GameIn) => goals + game.homeTeamGoals, 0);

    switch (location) {
      case 'home':
        return homeGoals;
      case 'away':
        return awayGoals;
      default:
        return homeGoals + awayGoals;
    }
  }

  static calcGoalsBala(team: TeamIn, location: string) {
    const balance = Calculator.calcGoalsFav(team, location)
    - Calculator.calcGoalsOwn(team, location);
    return balance;
  }

  static calcPoints(team: TeamIn, location: string) {
    const winPoints = Calculator.calcVictories(team, location) * 3;
    const drawPoints = Calculator.calcDraws(team, location);
    return winPoints + drawPoints;
  }

  static calcEfi(team: TeamIn, location: string) {
    const efficiency = (Calculator.calcPoints(team, location)
    / (Calculator.calcGames(team, location) * 3)) * 100;
    return efficiency.toFixed(2);
  }

  static calcOrder(team: TeamIn[], location: string) {
    const order = Calculator.table(team, location)
      .sort((a: TableIn, b: TableIn) => {
        if (b.totalPoints - a.totalPoints !== 0) return b.totalPoints - a.totalPoints;
        if (b.totalVictories - a.totalVictories !== 0) return b.totalVictories - a.totalVictories;
        if (b.goalsBalance - a.goalsBalance !== 0) return b.goalsBalance - a.goalsBalance;
        if (b.goalsFavor - a.goalsFavor !== 0) return b.goalsFavor - a.goalsFavor;
        return b.goalsOwn - a.goalsOwn;
      });
    return order;
  }
}
