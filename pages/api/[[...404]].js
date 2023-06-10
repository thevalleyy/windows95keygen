export default (req, res) => {
    const json = {
        error:
            req.url +
            " is not a valid request. Valid endpoints are listed below. Detailed instructions can be found under https://github.com/thevalleyy/windows95keygen#api-documentation.",
        methods: {
            api: {
                generate: {
                    10: "Generates a 10-digit Key",
                    11: "Generates a 11-digit Key",
                    oem: "Generates an OEM Key",
                },
                validate: "Validates a Key",
            },
        },
    };
    res.status(404).json(json);
};
