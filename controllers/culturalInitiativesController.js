const { QuestionsAuditCultureData } = require("../models/culturalQsts");
const { AxesCultureData } = require("../models/culturalAxes");
const { CulturalInitiatives } = require("../models/culturalInitiatives");



const CultutralInitiativesCtrl = {

    //Get all
    getData: async(req, res) => {
        try {
            const axes = await CulturalInitiatives.find()

            res.status(200).json(axes);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    //Get initiatives by providing the axe name and its degree [ {cultural_axe : ..., score : }]
    getInitiatives: async(req, res) => {
        try {
            const { cultural_data } = req.body
            let results = [];
            let initiative = []

            await Promise.all(
                cultural_data.map(async(item) => {

                    if (item.score < 4) {
                        let initiatives = await CulturalInitiatives.find({ cultural_axe: item.cultural_axe, degree: { $lt: 4 } })
                        initiatives.map((item) => {
                            item.initiatives.map((ele) => {
                                initiative.push(ele)
                            })
                        })
                        results.push({ "cultural_axe": item.cultural_axe, "initiatives": initiative })

                    } else {
                        let initiatives = await CulturalInitiatives.find({ cultural_axe: item.cultural_axe, degree: { $gte: 4 } })
                        initiatives.map((item) => {
                            item.initiatives.map((ele) => {
                                initiative.push(ele)
                            })
                        })
                        results.push({ "cultural_axe": item.cultural_axe, "initiatives": initiative })


                    }
                })
            )


            console.log(` cultural initiatives results ${JSON.stringify(results)}`)
            res.status(200).json(results)

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = CultutralInitiativesCtrl;