var bcrypt = require('bcryptjs');
var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define('user', {
		firstname: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false,
			validate: {
				len: [1, 100]
			}
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false,
			validate: {
				len: [1, 100]
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		salt: {
			type: DataTypes.STRING
		},
		password_hash: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.VIRTUAL,
			allowNull: false,
			validate: {
				len: [7, 100]
			},
			set: function(value) {
				var salt = bcrypt.genSaltSync(10);
				var hashedPassword = bcrypt.hashSync(value, salt);

				this.setDataValue('password', value);
				this.setDataValue('salt', salt);
				this.setDataValue('password_hash', hashedPassword);
			}
		}
	}, {
		hooks: {
			beforeValidate: function(user, options) {
				//user.email
				if(typeof user.email === 'string') {
					user.email = user.email.toLowerCase();
				}
			}
		},		
		classMethods: {
			authenticate: function(body) {
				return new Promise(function(resolve, reject) {
					if(typeof body.email !== 'string' || typeof body.password !== 'string') {
						return reject();
					}

					user.findOne({
						where: {
							email: body.email
						}
					}).then(function(user) {
						if(!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
							return reject();
						}

						resolve(user);
					}, function(e) {
						reject();
					});	
				});
			}
		},
		instanceMethods: {
			toPublicJSON: function() {
				var json = this.toJSON(); //this refers to the instance
				return _.pick(json, 'id', 'fname', 'lname', 'email', 'createdAt', 'updatedAt');
			}
		}
	});

	return user;
};