const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { ObjectId } = require('mongodb');

// Maps to store relationships between old IDs and new ObjectIds
const userIdMap = new Map();
const gameIdMap = new Map();

// Output files
const outputFiles = {
  users: 'senaycasino.users.json',
  games: 'senaycasino.games.json',
  gameSessions: 'senaycasino.gamesessions.json'
};

// Arrays to store converted data
const users = [];
const games = [];
const gameSessions = [];

// Function to parse CSV file
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv({
        headers: false,
        skipLines: 0
      }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

// Convert users data
async function convertUsers() {
  console.log('Converting users...');
  try {
    const data = await parseCSV('sql-users.csv');
    
    data.forEach(row => {
      // Assuming CSV format: id, username, password, balance, created_at, updated_at
      const id = row['0'];
      const username = row['1'];
      const password = row['2'];
      const balance = parseFloat(row['3']) || 2000.0;
      const createdAt = new Date(row['4'] || new Date());
      const updatedAt = new Date(row['5'] || createdAt);
      
      // Handle dates format for MongoDB
      const createdAtFormatted = { "$date": createdAt.toISOString() };
      const updatedAtFormatted = { "$date": updatedAt.toISOString() };
      
      const newObjectId = new ObjectId();
      userIdMap.set(id, newObjectId);
      
      users.push({
        _id: newObjectId,
        username: username,
        password: password,
        balance: balance,
        createdAt: createdAtFormatted,
        updatedAt: updatedAtFormatted
      });
    });
    
    // Write to file with special handling for ObjectIds
    const usersJson = JSON.stringify(users, (key, value) => {
      // Convert ObjectId instances to a format MongoDB can import
      if (key === '_id' || key === 'gameId' || key === 'userId') {
        return { "$oid": value.toString() };
      }
      return value;
    }, 2);
    
    fs.writeFileSync(outputFiles.users, usersJson);
    console.log(`Users converted and saved to ${outputFiles.users}`);
  } catch (error) {
    console.error('Error converting users:', error);
  }
}

// Convert games data
async function convertGames() {
  console.log('Converting games...');
  try {
    const data = await parseCSV('sql-games.csv');
    
    data.forEach(row => {
      // Assuming CSV format: id, name, description, minPlayers, maxPlayers, minBet, maxBet, enabled, created_at, updated_at
      const id = row['0'];
      const name = row['1'];
      const description = row['2'];
      const minPlayers = parseInt(row['3']) || 1;
      const maxPlayers = parseInt(row['4']) || 1;
      const minBet = parseFloat(row['5']) || 0.1;
      const maxBet = parseFloat(row['6']) || 100;
      const enabled = row['7'] === '1';
      const createdAt = new Date(row['8'] || new Date());
      const updatedAt = new Date(row['9'] || createdAt);
      
      // Handle dates format for MongoDB
      const createdAtFormatted = { "$date": createdAt.toISOString() };
      const updatedAtFormatted = { "$date": updatedAt.toISOString() };
      
      const newObjectId = new ObjectId();
      gameIdMap.set(id, newObjectId);
      
      games.push({
        _id: newObjectId,
        name: name,
        description: description,
        minPlayers: minPlayers,
        maxPlayers: maxPlayers,
        minBet: minBet,
        maxBet: maxBet,
        enabled: enabled,
        createdAt: createdAtFormatted,
        updatedAt: updatedAtFormatted
      });
    });
    
    // Write to file with special handling for ObjectIds
    const gamesJson = JSON.stringify(games, (key, value) => {
      // Convert ObjectId instances to a format MongoDB can import
      if (key === '_id' || key === 'gameId' || key === 'userId') {
        return { "$oid": value.toString() };
      }
      return value;
    }, 2);
    
    fs.writeFileSync(outputFiles.games, gamesJson);
    console.log(`Games converted and saved to ${outputFiles.games}`);
  } catch (error) {
    console.error('Error converting games:', error);
  }
}

// Convert game sessions data
async function convertGameSessions() {
  console.log('Converting game sessions...');
  try {
    const data = await parseCSV('sql-gamesessions.csv');
    
    data.forEach(row => {
      // Assuming CSV format: id, gameId, userId, bet, win, created_at
      const id = row['0'];
      const gameId = row['1'];
      const userId = row['2'];
      const bet = parseFloat(row['3']) || 0;
      const win = parseFloat(row['4']) || 0;
      const createdAt = new Date(row['5'] || new Date());
      
      // Handle date format for MongoDB
      const createdAtFormatted = { "$date": createdAt.toISOString() };
      
      // Skip if we don't have mappings for foreign keys
      if (!gameIdMap.has(gameId) || !userIdMap.has(userId)) {
        console.warn(`Skipping game session ${id}: missing gameId ${gameId} or userId ${userId} reference`);
        return;
      }
      
      gameSessions.push({
        _id: new ObjectId(),
        gameId: gameIdMap.get(gameId),
        userId: userIdMap.get(userId),
        bet: bet,
        win: win,
        createdAt: createdAtFormatted
      });
    });
    
    // Write to file with special handling for ObjectIds
    const gameSessionsJson = JSON.stringify(gameSessions, (key, value) => {
      // Convert ObjectId instances to a format MongoDB can import
      if (key === '_id' || key === 'gameId' || key === 'userId') {
        return { "$oid": value.toString() };
      }
      return value;
    }, 2);
    
    fs.writeFileSync(outputFiles.gameSessions, gameSessionsJson);
    console.log(`Game sessions converted and saved to ${outputFiles.gameSessions}`);
  } catch (error) {
    console.error('Error converting game sessions:', error);
  }
}

// Main function
async function main() {
  console.log('Starting conversion process...');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync('./output')) {
    fs.mkdirSync('./output');
  }
  
  // Process in sequence to maintain ID mapping
  await convertUsers();
  await convertGames();
  await convertGameSessions();
  
  console.log('Conversion completed successfully!');
}

// Run the converter
main().catch(err => {
  console.error('Error in conversion process:', err);
  process.exit(1);
});