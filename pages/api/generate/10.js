import generator from "../../../js/generators";
import blocked from "../../../js/request";
import config from "../../../config.json";
const amountLimit = config.limits.keys["10"];

export default async (req, res) => {
    if (await blocked(req, res)) return;
    var amount = Number.parseInt(req.query.amount);
    if (!amount || amount < 1) amount = 1;

    if (amount > amountLimit) {
        return res.status(400).json({
            error: `You can create a maximum of ${amountLimit} 10-digit Keys at once`,
            amount: amount,
        });
    }

    const generatedKey = {
        keys: generator.generate10Key(amount),
        amount: amount,
    };
    res.status(200).json(generatedKey);
};
