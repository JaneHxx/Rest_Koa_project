module.exports = function (sequelize,DataTypes) {
    return sequelize.define('sys_menu', {
        menu_id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true
        },
        parent_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            field: 'parent_id'
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'name'
        },
        url: {
            type: DataTypes.STRING(200),
            field: 'url'
        },
        perms: {
            type: DataTypes.STRING(500),
            field: 'perms'
        },
        type: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'type'
        },
        icon: {
            type: DataTypes.STRING(50),
            field: 'icon'
        },
        order_num: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'order_num'
        },
        sta: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            field: 'sta'
        }
    },{
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true
    });
};