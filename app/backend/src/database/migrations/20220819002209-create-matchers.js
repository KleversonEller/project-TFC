'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team',
        eferences: {
          model: 'Team',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      homeTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
      },
      awayTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team',
        eferences: {
          model: 'Team',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      awayTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team_goals',
      },
      inProgress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: 'in_progress',
        defaultValue: 0,
      },
    });
  },
  down: async (queryInterface, Sequelize)=> {
    await queryInterface.dropTable('matches');
  },
} 
