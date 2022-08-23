export default class Calculator {
  static table(data: any, location: string) {
    const table = data.map((team: any) => ({
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

  static calcGames(team: any, location: string) {
    const homeGame = [
      ...team.homeTeam.map((jogo: any) => jogo.homeTeamGoals),
    ].length;
    const awayGame = [
      ...team.awayTeam.map((jogo: any) => jogo.awayTeamGoals),
    ].length;

    if (location === 'home') return homeGame;
    if (location === 'away') return awayGame;
    return homeGame + awayGame;
  }

  static calcVictories(team: any, location: string) {
    const homeWin = team.homeTeam
      .reduce((wins: any, game: any) => (game.homeTeamGoals > game.awayTeamGoals
        ? wins + 1 : wins + 0), 0);
    const awayWin = team.awayTeam
      .reduce((wins: any, game: any) => (game.awayTeamGoals > game.homeTeamGoals
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

  static calcLosses(team: any, location: string) {
    const homeLose = team.homeTeam
      .reduce((lose: any, game: any) => (game.awayTeamGoals > game.homeTeamGoals
        ? lose + 1 : lose + 0), 0);
    const awayLose = team.awayTeam
      .reduce((lose: any, game: any) => (game.homeTeamGoals > game.awayTeamGoals
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

  static calcDraws(team: any, location: string) {
    return Calculator.calcGames(team, location)
        - (Calculator.calcVictories(team, location)
        + Calculator.calcLosses(team, location));
  }

  static calcGoalsFav(team: any, location: string) {
    const homeGoals = team.homeTeam
      .reduce((goals: any, game: any) => goals + game.homeTeamGoals, 0);
    const awayGoals = team.awayTeam
      .reduce((goals: any, game: any) => goals + game.awayTeamGoals, 0);

    switch (location) {
      case 'home':
        return homeGoals;
      case 'away':
        return awayGoals;
      default:
        return homeGoals + awayGoals;
    }
  }

  static calcGoalsOwn(team: any, location: string) {
    const homeGoals = team.homeTeam
      .reduce((goals: any, game: any) => goals + game.awayTeamGoals, 0);
    const awayGoals = team.awayTeam
      .reduce((goals: any, game: any) => goals + game.homeTeamGoals, 0);

    switch (location) {
      case 'home':
        return homeGoals;
      case 'away':
        return awayGoals;
      default:
        return homeGoals + awayGoals;
    }
  }

  static calcGoalsBala(team: any, location: string) {
    const balance = Calculator.calcGoalsFav(team, location)
    - Calculator.calcGoalsOwn(team, location);
    return balance;
  }

  static calcPoints(team: any, location: string) {
    const winPoints = Calculator.calcVictories(team, location) * 3;
    const drawPoints = Calculator.calcDraws(team, location);
    return winPoints + drawPoints;
  }

  static calcEfi(team: any, location: string) {
    const efficiency = (Calculator.calcPoints(team, location)
    / (Calculator.calcGames(team, location) * 3)) * 100;
    return efficiency.toFixed(2);
  }

  static calcOrder(team: any, location: string) {
    const order = Calculator.table(team, location)
      .sort((a: any, b: any) => {
        if (b.totalPoints - a.totalPoints !== 0) return b.totalPoints - a.totalPoints;
        if (b.totalVictories - a.totalVictories !== 0) return b.totalVictories - a.totalVictories;
        if (b.goalsBalance - a.goalsBalance !== 0) return b.goalsBalance - a.goalsBalance;
        if (b.goalsFavor - a.goalsFavor !== 0) return b.goalsFavor - a.goalsFavor;
        return b.goalsOwn - a.goalsOwn;
      });
    return order;
  }
}
