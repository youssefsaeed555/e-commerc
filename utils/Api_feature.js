class apiFeature {
    constructor(buildQuery, query) {
        this.buildQuery = buildQuery
        this.query = query
    }

    filter() {
        //1-filtering
        const queryObj = { ...this.query }
        const exclusives = ['page', 'limit', 'sort', 'fields']
        //delete not send in query
        exclusives.forEach((ele) => delete queryObj[ele])

        //apply[gt,gte,lt,lte] to query sent
        let qryString = JSON.stringify(queryObj) //1-convert json to string
        qryString = qryString.replace(/\b(gt|gte|lt|lte)\b/g, (idx) => `$${idx}`)
        //add $ to string to send in query mongosse
        this.buildQuery = this.buildQuery.find((JSON.parse(qryString)))
        return this
    }

    sort() {
        if (this.query.sort) {
            //remove , send in query to send in sort
            const sorting = this.query.sort.split(",").join(" ")
            //chain sort query
            this.buildQuery = this.buildQuery.sort(sorting)
        } else {
            //if no sort send then sortt them based on newest
            this.buildQuery = this.buildQuery.sort('-createdAt')
        }
        return this
    }

    fields() {
        if (this.query.fields) {
            //chain select to build query
            const fields = this.query.fields.split(',').join(' ')
            this.buildQuery = this.buildQuery.select(fields)
        } else {
            this.buildQuery = this.buildQuery.select('-__v')
        }
        return this
    }

    search() {
        if (this.query.keyword) {
            const query = {}
            query.$or = [
                //options:'i' for not case sensitve
                { title: { $regex: this.query.keyword, $options: 'i' } },
                { description: { $regex: this.query.keyword, $options: 'i' } }
            ]
            this.buildQuery = this.buildQuery.find(query)
        }
        return this
    }

    paginate(countDocs) {
        const page = this.query.page || 1
        const limit = this.query.limit || 10
        const skip = (page - 1) * limit
        const endIndexInPage = page * limit // 2 * 10 = 20
        const pagination = {}
        //+ in page and limit to convert string to numbers
        pagination.currentPage = +page
        pagination.limit = +limit
        //math.ceil for rounding to nearet big number
        pagination.numberOfPages = Math.ceil(countDocs / limit)
        if (countDocs > endIndexInPage) {
            pagination.nextPage = +page + 1
        }
        if (skip > 0) //that mean skip in first page
        {
            pagination.pervoiuesPage = page - 1
        }

        //build query 
        this.buildQuery = this.buildQuery.skip(skip).limit(limit)
        this.paginationResult = pagination
        return this
    }
}
// return this means returning this from a method called is a common way to allow "chaining" of methods together
module.exports = apiFeature