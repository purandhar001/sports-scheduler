const Session = require('../models/Session');

exports.getReportsPage = async (req, res) => {
    try {

        const totalSessions = await Session.countDocuments();


        const sportPopularity = await Session.aggregate([

            {
                $group: {
                    _id: '$sport',
                    sessionCount: { $sum: 1 }
                }
            },

            {
                $lookup: {
                    from: 'sports', 
                    localField: '_id', 
                    foreignField: '_id', 
                    as: 'sportDetails' 
                }
            },
            
            {
                $sort: { sessionCount: -1 }
            },
            
            {
                $project: {
                    _id: 0, 
                    sportName: { $arrayElemAt: ['$sportDetails.name', 0] }, 
                    count: '$sessionCount' 
                }
            }
        ]);

        res.render('admin/reports', {
            user: req.user,
            totalSessions,
            sportPopularity
        });

    } catch (err) {
        console.error(err);
        res.redirect('/admin/dashboard');
    }
};