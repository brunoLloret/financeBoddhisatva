

interface NasdaqIndicators {
    name: string;
    price: number;
    change: number;
    changePercent: string;
}

export const nasdaqIndicators: NasdaqIndicators[] = [
    {
        name: "AAPL",
        price: 220.27,
        change: 1.62, // Assuming percentageChange is the change in percent
        changePercent: "1.62%"
    },
    {
        name: "BABA",
        price: 91.50,
        change: 2.15,
        changePercent: "2.15%"
    },
    {
        name: "MSFT",
        price: 343.29,
        change: 2.05,
        changePercent: "2.05%"
    },
    {
        name: "TCEHY",
        price: 51.20,
        change: 1.32,
        changePercent: "1.32%"
    },
    {
        name: "GOOGL",
        price: 145.80,
        change: 1.74,
        changePercent: "1.74%"
    },
    {
        name: "JD",
        price: 67.88,
        change: 3.08,
        changePercent: "3.08%"
    },
    {
        name: "AMZN",
        price: 200.00,
        change: 1.42,
        changePercent: "1.42%"
    },
    {
        name: "PDD",
        price: 88.73,
        change: 4.45,
        changePercent: "4.45%"
    },
    {
        name: "NVDA",
        price: 122.67,
        change: -1.31,
        changePercent: "-1.31%"
    },
    {
        name: "NTES",
        price: 93.14,
        change: 1.56,
        changePercent: "1.56%"
    },
    {
        name: "TSLA",
        price: 231.26,
        change: 10.20,
        changePercent: "10.20%"
    },
    {
        name: "SNP",
        price: 52.76,
        change: 0.99,
        changePercent: "0.99%"
    },
    {
        name: "META",
        price: 315.26,
        change: 2.86,
        changePercent: "2.86%"
    },
    {
        name: "PTR",
        price: 51.28,
        change: -0.89,
        changePercent: "-0.89%"
    },
    {
        name: "ADBE",
        price: 510.99,
        change: 0.97,
        changePercent: "0.97%"
    },
    {
        name: "CHL",
        price: 27.19,
        change: 2.43,
        changePercent: "2.43%"
    },
    {
        name: "NFLX",
        price: 442.55,
        change: -0.94,
        changePercent: "-0.94%"
    },
    {
        name: "CMG",
        price: 22.08,
        change: -1.11,
        changePercent: "-1.11%"
    },
    {
        name: "CSCO",
        price: 55.67,
        change: 0.15,
        changePercent: "0.15%"
    },
    {
        name: "HNP",
        price: 30.21,
        change: 1.21,
        changePercent: "1.21%"
    }
];
