exports.port = process.argv[2] || process.env.PORT || 8080;
exports.dbUrl = process.env.DB_URL || 'mongodb+srv://db_user_burguerQueen:LJ6arfbrBD3gXyJG@cluster0.tlfgj.mongodb.net/burguerQueen?retryWrites=true&w=majority';
exports.secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
//'mongodb+srv://db_user_burguerQueen:LJ6arfbrBD3gXyJG@cluster0.tlfgj.mongodb.net/burguerQueen?retryWrites=true&w=majority'
//'mongodb://localhost:27017/test'