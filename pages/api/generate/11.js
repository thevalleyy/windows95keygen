import generator from "../../../js/generators";
import requestBlock from "../../../js/request";
import config from "../../../config.json";
const amountLimit = config.limits.keys["11"];

export default async (req, res) => {
    if (await requestBlock(req, res)) return;
    var amount = Number.parseInt(req.query.amount);
    if (!amount || amount < 1) amount = 1;

    if (amount > amountLimit) {
        return res.status(400).json({
            error: `You can create a maximum of ${amountLimit} 11-digit keys at once`,
            amount: amount,
        });
    }

    const generatedKey = {
        keys: generator.generate11Key(amount),
        amount: amount,
    };
    res.status(200).json(generatedKey);
};
