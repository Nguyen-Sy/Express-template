const { Types } = require("mongoose");

class Repository {
	constructor(model) {
		this.model = model;
		this.defaultOption = {
			select: [],
			unselect: ["_v", "isDeleted"],
			sort: "ctime",
		};
		this.defaultPaginateOption = {
			page: 1,
			limit: 20,
		};
	}

	#createFilter = ({ select, unselect }) => {
		return select.length != 0
			? Object.fromEntries(select.map((el) => [el, 1]))
			: unselect.length != 0
				? Object.fromEntries(unselect.map((el) => [el, 0]))
				: [];
	};

	create = async (object) => {
		return await this.model.create(object);
	};

	insertMany = async (objects) => {
		return await this.model.insertMany(objects, {
			upsert: true,
			new: true,
		});
	};

	findById = async (id) => await this.model.findById(new Types.ObjectId(id));

	find = async (filter, options = { ...this.defaultOption }) => {
		return await this.model
			.find({
				...filter,
				isDeleted: {
					$ne: true,
				},
			})
			.select(this.#createFilter(options))
			.sort(options.sort)
			.lean();
	};

	page = async (
		filter,
		options = { ...this.defaultOption, ...this.defaultPaginateOption },
	) => {
		return await this.model
			.find({
				...filter,
				isDeleted: {
					$ne: true,
				},
			})
			.select(this.#createFilter(options))
			.skip((options.page - 1) * options.limit)
			.size(options.limit)
			.sort(options.sort)
			.lean();
	};

	findOne = async (filter, options = { ...this.defaultOption }) => {
		return await this.model
			.findOne({
				...filter,
				isDeleted: {
					$ne: true,
				},
			})
			.select(this.#createFilter(options))
			.lean();
	};

	findOneAndUpdate = async (filter, object) => {
		const res = await this.model.findOneAndUpdate(filter, object, {
			upsert: true,
			new: true,
		});
		return res;
	};

	findOneAndDelete = async (filter) => {
		return await this.model.findOneAndUpdate(filter, {
			isDeleted: true,
		});
	};
}

module.exports = Repository;
