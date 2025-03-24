db = db.getSiblingDB('admin');

db.createRole({
  role: "readWriteRole",
  privileges: [
    { resource: { db: "appdb", collection: "" }, actions: [ "find", "insert", "remove", "update" ] }
  ],
  roles: []
});

db.createRole({
  role: "readOnlyRole",
  privileges: [
    { resource: { db: "appdb", collection: "" }, actions: [ "find" ] }
  ],
  roles: []
});

db.createRole({
  role: "adminRole",
  privileges: [
    { resource: { db: "appdb", collection: "" }, actions: [ "find", "insert", "remove", "update", "createIndex", "dropIndex" ] },
    { resource: { db: "appdb", collection: "system.js" }, actions: [ "find", "insert", "remove", "update" ] }
  ],
  roles: [ "readWriteRole" ]
});

db.createUser({
  user: "admin",
  pwd: "RohrKabel06",
  roles: [ 
    { role: "adminRole", db: "admin" },
    { role: "userAdminAnyDatabase", db: "admin" }
  ]
});
db.createUser({
  user: "readwrite",
  pwd: "RohrKabel05",
  roles: [
    { role: "readWriteRole", db: "admin" }
  ]
});
