const {
    getSelectData,
    getUnSelectData,
    castStringToObjectIdMongoose,
} = require("../../utils");

class Repository {
    constructor(model) {
        this.model = model;
    }

    create = async (object) => {
        return await this.model.create(object);
    };

    createSelection = ({ select, unselect }) => {
        return select.length != 0
            ? getSelectData(select)
            : unselect.length != 0
            ? getUnSelectData(unselect)
            : [];
    };

    findById = async (id) => {
        const res = await this.model
            .findById(castStringToObjectIdMongoose(id))
            .select(selection)
            .lean();
        return res;
    };

    findMany = async ({
        filter,
        select = [],
        unselect = ["_v", "isDeleted"],
        sort = "ctime",
        page = 1,
        limit = 20,
    }) => {
        const selection = this.createSelection({ select, unselect });
        const skip = (page - 1) * limit;
        const sortBy = sort ? { sort: -1 } : { id: -1 };
        const res = await this.model
            .find({
                ...filter,
                isDeleted: {
                    $ne: true,
                },
            })
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(selection)
            .lean();
        return res;
    };

    findOne = async ({ filter, select = [], unselect = [] }) => {
        const selection = this.createSelection({ select, unselect });
        const res = await this.model
            .findOne({
                ...filter,
                isDeleted: false,
            })
            .select(selection)
            .lean();
        return res;
    };

    findOneAndDelete = async (query) => {
        return await this.findOneAndUpdate({
            query,
            object: { isDeleted: true },
        });
    };

    findOneAndUpdate = async ({ query, object }) => {
        const options = {
            upsert: true,
            new: true,
        };
        const res = await this.model.findOneAndUpdate(query, object, options);
        return res;
    };
}

module.exports = Repository;
