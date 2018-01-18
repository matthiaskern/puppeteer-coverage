# puppeteer-coverage

Small script to fetch css and js coverage via `puppeteer` and print them to console.

## Installation
`yarn`

## Usage
`node index <url>`

## Examples
```
node index.js https://google.com

measurement  total    used    percentage
-----------  -------  ------  ----------
js           969500   355813  36.70%
css          71679    15536   21.67%
total        1041179  371349  35.67%
```

```
node index.js https://theguardian.com

measurement  total     used     percentage
-----------  --------  -------  ----------
js           8847631   2427234  27.43%
css          2951118   79362    2.69%
total        11798749  2506596  21.24%
```

```
node index.js https://nytimes.com

measurement  total    used     percentage
-----------  -------  -------  ----------
js           4404305  2136165  48.50%
css          740831   60009    8.10%
total        5145136  2196174  42.68%
```

## License
MIT
