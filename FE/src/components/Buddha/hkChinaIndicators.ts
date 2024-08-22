interface NasdaqIndicators {
    name: string;
    price: number;
    change: number;
    changePercent: string;
}

export const hkChinaIndicators: NasdaqIndicators[] = [
    // Original indicators
    {
        name: "TCEHY",
        price: 350.00,
        change: 5.00,
        changePercent: "1.45%"
    },
    {
        name: "BABA",
        price: 101.50,
        change: 2.00,
        changePercent: "2.01%"
    },
    {
        name: "JD",
        price: 67.88,
        change: 3.08,
        changePercent: "4.76%"
    },
    {
        name: "NTES",
        price: 93.14,
        change: 1.56,
        changePercent: "1.70%"
    },
    {
        name: "PDD",
        price: 88.73,
        change: 4.45,
        changePercent: "5.28%"
    },
    {
        name: "摩訶般若波羅蜜多心経",
        price: 51.28,
        change: -0.89,
        changePercent: "-1.71%"
    },
    {
        name: "CHL",
        price: 27.19,
        change: 2.43,
        changePercent: "9.82%"
    },
    {
        name: "SNP",
        price: 52.76,
        change: 0.99,
        changePercent: "1.91%"
    },
    {
        name: "HNP",
        price: 30.21,
        change: 1.21,
        changePercent: "4.17%"
    },
    // New fake Asian indicators
    {
        name: "MKA",
        price: 180.25,
        change: 7.15,
        changePercent: "4.13%"
    },
    {
        name: "HNYA",
        price: 145.60,
        change: -3.20,
        changePercent: "-2.15%"
    },
    {
        name: "HRA",
        price: 99.87,
        change: 2.75,
        changePercent: "2.83%"
    },
    {
        name: "MTA",
        price: 210.45,
        change: 9.60,
        changePercent: "4.78%"
    },
    {
        name: "SHIN",
        price: 88.90,
        change: -1.45,
        changePercent: "-1.61%"
    },
    {
        name: "色",
        price: 67.45,
        change: 0.90,
        changePercent: "1.35%"
    },
    {
        name: "不",
        price: 302.70,
        change: 5.85,
        changePercent: "1.97%"
    },
    {
        name: "異",
        price: 152.10,
        change: -2.00,
        changePercent: "-1.30%"
    },
    {
        name: "空",
        price: 75.30,
        change: 3.10,
        changePercent: "4.30%"
    }
];
