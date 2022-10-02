// this type query used when you want get data from multiple collections with one query

function unionQuery() {
    const filter = { roleType: 'user' }
        // you can for each query give own filter by $match, and get own fields with $project

    return UserModel.aggregate([{
            $match: filter
        },
        {
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                email: 1,
                avatar_path: 1,
                'status': 'Deleted'
            }
        },
        {
            $unionWith: {
                coll: 'DeletedUsers',
                pipeline: [{
                        $match: filter
                    },
                    {
                        $project: {
                            _id: 1,
                            firstName: 1,
                            lastName: 1,
                            email: 1,
                            avatar_path: 1,
                            'status': 'Deleted'
                        }
                    }
                ]
            }
        },
    ]);
}