const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

let db = [
  {
    id: 1,
    imageUrl: "https://www.gastronom.ru/binfiles/images/20160329/b4cd7935.jpg",
    name: "Tomato",
    count: 40,
    size: {
      width: 12,
      height: 13234,
    },
    weight: "10000g",
    comments: [
      {
        id: 1,
        productId: 1,
        description: "Red tomato",
        date: "14:00 22.08.2021",
      },
      {
        id: 2,
        productId: 1,
        description: "Very tasty tomato",
        date: "14:00 22.08.2021",
      },
    ],
  },
  {
    id: 2,
    imageUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISEhESEhISEhEREREREhERERERERERGBQZGRgUGBkcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHjQrISQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAKcBLgMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAgMBBAUGBwj/xAA4EAACAQIDBgMGBAYDAQAAAAAAAQIDEQQhMQUSQVFhcROBkSIyQlKh0QaCscEHM2Jy4fAVkvEU/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EAC8RAAICAQMDAQYGAwEAAAAAAAABAgMRBCExEkFRYQUTIjKRsUJxgaHR4cHw8SP/2gAMAwEAAhEDEQA/APswAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCpNRTb0SuSbOJtTG73sx91fU5tVqY0Q6nz2XktGPU8HMlTUp3avnvGxtWEpw3Y2ScorebyS/2xDDR1lzMYevvymo2nBOz/ALunM8DSzxly5kd6XfwW4RVE0py0ukk8muDOhho3qQtw3m+1rfq0UNqKV08l3Ltj1N6VRtNOO7GN/l1b83+iPToa64xT7mVr+Fs64APVOMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi5Ja5GtUxPy+rMrb4VL4mWUW+DZbSKpYiK437Zmi5NvNtkZHmWe1MfLH6mqp8sYvFOWXux5c+5zXDffRG1Om2+hXiaipwcuWnV8DybJWXz67TeMEtkc3bOJ3IeHDJv3muC5Efw/Sai+5zZN1J3ed2eh2XTtHzZMV1PJq/hWDZkm2ori7I7VCkoJJLu+LfNnMw0bzj3v+52D3NBBYlL9DjubzgAA9EwAAAAAAAAAAPGP+I+z9+VNOtLdbTnGleCz11v10PS0dowmlKKbTSaemTM52wh8zwWUJPhG8CiOIi+Nu5NVYviSrIPhr6kdLRYCKafEkXIAAAAAAAAAAAAAAAABCUks2Q2luwTKKldLJZv6FVSu3pkvqys87Ua3G1f1/g1jX5Em3myDMsrlI8edjb9TVINmEiLJItCCW7LmWjifiNtU4JXznnblZnbucnbDT3F1bJtw0Xr+Y5WCgtT0WFhuxXbPuaOAwF0pWtHX+5/Y6ig0jOGer0Jm1wTwnvR7nWOPB2afKzOvc9v2fPMJL1/37HJf8xkAHoGIAAAAAAAMMA/OTwznUlCEWpeLUlPdjG13N2j/wCcD6jszxIwgpXi1GKtnllodKvsejCs6vhpzWSdl7K5orqzR837R1Kn8GMY+56VMcLJZTxkkblPGJ6nMiWxiebXdNcM1cIs68KyejLo15Ljc40UWwqyXG66nbVqpR34/IwlSjt08SnqrfoXRkno7nGp4lPXI2I1OT9D06vaD/Fv9znlTg6gNKGJa1z/AFLViY8bo7oaqqXfH5mLhJGwCvxY8x4seZr7yPlfVEYZYCp148/oyuWKXBN/QrK+qPMkT0y8GyRlJLV2NR15PoRfXM5bNdBL4Vksq/JdUxHy+rNdtt3buLmDzbdTOzl7GiilwZDZGUkiqc76aHK5vgulklKfLUrMpAvGHkvjAZmJFyI79i7eBgzWqKKZzcNR8ebnL+XD2Yr5pcX2+xXiasqtRUoO185yXww+52qFNRioxVoxSSXQ5k/eyz2RpL/zj6svhETMXDZ2wObuVyRu4WV4roaTL8FLNrodOll03JedhYsxN4AHsHMAAAAAAAAAauMobyutV9UcLE4Xij05o4uhxWnHozy/aGjVi61z3/k6KLXF4PNWsWQkbOIw/FGm1Y+ZnCVcsM9FNSRsxaJxNWMi6MzaEyGi7dMq60ZCEi1M3WGZsshX5ovjNPQ1bDdNFOSM3FM3DKZqRm1xLFWZb3qKuDNi4KPH6EvG6B2Ir0suuYbKXWIuo2Uc/A6GXOaISq8ioykV6XIsopDUyjDZhs0jFRLEmyNyNyMp2ErEiVElKRzNpY7dW7HOTySWrb0RHaG0FCLd9CvYmElOXj1Fr/Li/hj83dnJKbteFwbRioLqkdLZWC8OF5Z1Je1N9eS6I6KRhIkzrhHCwcs5OTywzDAN4rYrgyWYNe16lRfg45t8kdFCzbErPaLN0AHsnMAAAAAAAAACMrWz06kj5z/FPaTtQw1KonU39+rSjJqW47KDlbq5WT5X4EN4RKWXg9hWcG2ou/L7GjiMNfNa8jzeydoSq0oSbd0kmrvVJfU7mG2j8M81wnx8z5S26E7JV2LDT/T+j0o1yisxeStxsYTOhUpqaurO+jWjNCrTcTKVTiXUsk4zLY1DnValiiOLzKdbjyTjJ3I1CyMjl0cQbUKqLR1EWQ4M3EwURmWKZspplHHBOxlIhvGd4tlFcE7AhvmHMdSGCzeIuRW5kJTKu1InpLnIjKZrTrGrXxSSu2kubOaep7I0jWzcqV0jl4/aMYLXPglqznYvabllT/7P9kT2TsiVaW/O+5fNvWfRFOiU95/Q1woLLJ7LwM8TUVSp/Li8o8JM9fTgkkkRoUowSjFWSVklwLUjrrhg5LLOtkkiNw2YRvHkzSMtiJiRmJt3Bk3MLG0e7NSKu0lqzoxjZJHdo4Zk5eP8mVr2wSAB6RgAAAAAAAAAD5Z/EjY05YrxqcW3UowUrJvelGW6kutn9D6mcjb2EVSEZNX3Hdr+n/DsZXNqPUu25pX8x4T8O4GdOlad027pNvSyX63OlxN6vC9mijw+h8bqm52ufk9WvZYJ0MRKOj8uDNuOOhLKSs+epoyiUTRjVfOGye3gu4RlydDE4VTV4NeWaPmm1dvVoY2pSpNeHSSjK6W653zztd+R7lVJRzjJp9HY89tT8JVJ15VqaThXlTnZPdcXuxUm/O79T1dDOmcm7EuO/H/TC2M4pdL7nc/CmIWIpt1EnJWd4tq6bfDyO/PBL4W13zRz9mbLWHTSleVlpFRSstOp0oVWtTjvlRKx9K2JTnjOSl4aa0s+zIuclqmu6OhCaZlpGXuF+Bke8fdHPVcz45tTwkJcLPnHI1auBkvdal9GVlG5epeMq36GfHIuuaVaTh70ZL8rt66GpPH8o37uxTqtZp0I6kq5r1sUo+9JI5VTF1JfFbpHIjTwVSp7sJyvxs7eryJVTfzMnCRfX2lwgvOX2NCTnUkrtyb0Wvojt4b8PTec5KK5R9qXrovqdzB7Op0vcjn8zzk/M6IV4+VGcrorg4my9gt2lVVlqofc9JTpqKSSSS0SJJGUbxhjc5ZzcuQkYcjMpEDRblUjJlGCSNIgwZQJ0qe87evY3hFyeFyyG8F+Fp/E+y+5tkYq2S0JHt1VquKijkk8vIABoQAAAAAAAAACMo3Vno9SQAPMbRwjpz/oecX+xrqOWR6mvRjOLjJXT+nVHBxeCnSd/ej8y4d+R4Ou0Li3OC2+x3U3ZWHyaU4FEoG7dMqnA8WdOTqUjnzpo6+zJb0N3jDLy4f70NKcCeBnuTV9Hk/uRUnCeHw9iZ/FE2qjakZTNjFUrq/E0oyKSi6ZuL4ZWL6lk2IxLUzWjULYzOiGCskXxkTuVRZJM3M2iwrlQg9YRfeKZJMymRgrgxCjFaRiuySLEiNzNyUkQSRkhvC5bcgm2RuYuYJwDIMGSxJlGbmEZLogfudChT3V1epr4enb2nrw6G1GR62ko6V1y5f7f2c9k87IsBFMydxkZABIAAAAAAAAAAAAAAAOdidlwlnH2Jc1o+6OfW2ZVjpaS6Oz9GegbK5VDkt0tM92t/TY1hbNcHl6lCcfepzX5W16o05zS/zkesqYg069a+tn3zOCfs2vtJ/sdEdRLujR2fi1NbjftJZf1RI4inZ5GKtk7qMVJaNRSaLqNZVFZ5TXDg+qOTVaKThznBpCxdWTVJQLZ0rMxuHnwytmbZySjMvjI14xJo3RVouTJopUyUZllJMzaLDJC4uTkgmZIXFwCVzJEymWRBkyRuYciyRGCdyylDi/QhThxZsQPT0+mx8U/p/JlOfZFkSxMrROJ6BgWJkkRiiSRYqZMgEgAAkAAAAAAAAAGLkJSJMjJFGySEpFMyxorkijLI16kSicDclErcDNl0aE6Vyp4c6LpmHTM3AupGtGT0ln14+ZGUDZcCLicl2ihPdbMvGxo10ZsTnAhoefPTWw5W3obKaZlIkkRUlzJGRJkXI3MOoiRgsuLmtPExjm5Jd2ka0trU+Et7+xOX1RZLPBGDpXDmjlf/bOfuU2lzn9l9y6lhpy9+TfRZI6a9NZLtgo5RRtuunks+xbSi2ZoYS3A3qeGPSp00Yb9zCdmSqES+EC+NJIssdaiYtlSgTUSYNMEZMGQCSAAAAAAAAAAAAAAADBhoAqCuUSEogFGXRBoi0AVLIi0YaMgqySDiQlAAqSQlAplAAo0SjXnA15wnwk15gGE4Rk90aRbNedGq/jl6or/wCLnLWpN/naMAtCivwQ7JF9LYEdZZvrmdOhsiEdEgDqjCK7GTnJ9zfpYFLgjbhh0gDRRRnktUESsAaJFTIAJAAAAAAAAAAAAB//2Q==",
    name: "banana",
    count: 100,
    size: {
      width: 209080,
      height: 9356,
    },
    weight: "20500g",
    comments: [
      {
        id: 1,
        productId: 2,
        description: "yellow banana",
        date: "14:00 22.08.2021",
      },
      {
        id: 2,
        productId: 2,
        description: "Love this",
        date: "14:00 22.08.2021",
      },
    ],
  },
  {
    id: 3,
    imageUrl: null,
    name: "apple",
    count: 20,
    size: {
      width: 987,
      height: 785,
    },
    weight: "500000g",
    comments: [
      {
        id: 1,
        productId: 3,
        description: "Beautiful apple",
        date: "14:00 22.08.2021",
      },
      {
        id: 2,
        productId: 3,
        description: "tasty apple",
        date: "14:00 22.08.2021",
      },
    ],
  },
  {
    id: 4,
    imageUrl: null,
    name: "strawberries",
    count: 4,
    size: {
      width: 656758,
      height: 1235,
    },
    weight: "5000g",
    comments: [
      {
        id: 1,
        productId: 4,
        description: "Good product",
        date: "14:00 22.08.2021",
      },
      {
        id: 2,
        productId: 4,
        description: "Love this so match",
        date: "14:00 22.08.2021",
      },
    ],
  },
  {
    id: 5,
    imageUrl:
      "data:image/jpeg;base64,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",
    name: "pear",
    count: 4000,
    size: {
      width: 250,
      height: 2300,
    },
    weight: "200g",
    comments: [
      {
        id: 1,
        productId: 5,
        description: "delicious pear",
        date: "14:00 22.08.2021",
      },
      {
        id: 2,
        productId: 5,
        description: "Love this so match",
        date: "14:00 22.08.2021",
      },
    ],
  },
  {
    id: 6,
    imageUrl:
      "data:image/jpeg;base64,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",
    name: "SALO",
    count: 10,
    size: {
      width: 10,
      height: 20,
    },
    weight: "2000000g",
    comments: [
      {
        id: 1,
        productId: 6,
        description: "Good product",
        date: "14:00 22.08.2021",
      },
      {
        id: 2,
        productId: 6,
        description: "Love this so match",
        date: "14:00 22.08.2021",
      },
    ],
  },
];

app.get("/items", cors(), (req, res) => {
  res.json({
    data: db || [],
  });
  res.status(200);
});

app.get("/items/:id", cors(), (req, res) => {
  res.json({ data: db.find((el) => el.id === Number(req.params.id)) || [] });
  res.status(200);
});

app.post("/items", cors(), (req, res) => {
  db.push({ ...req.body, id: db?.length + 1 || 1 });
  res.json({ item: { ...req.body, id: db?.length + 1 || 1 } });
  res.status(200);
});

app.post("/items/:id", cors(), (req, res) => {
  if (!Number(req.params.id)) return res.status(500);
  db = db.map((item) => {
    if (Number(req.params.id) === item.id)
      return { ...req.body, id: item.id, comments: item.comments };
    return item;
  });
  res.json({
    ok: true,
    item: db.find((el) => el.id === Number(req.params.id)) || {},
  });
  res.status(200);
});

app.post("/items/:id/comment", cors(), (req, res) => {
  if (!Number(req.params.id)) return res.status(500);
  const now = new Date();
  let date = `${now.getHours()}:${now.getMinutes()} ${now.getDate()}.${now.getMonth()}.${now.getFullYear()}`;
  db = db.map((item) => {
    if (Number(req.params.id) === item.id)
      return {
        ...item,
        comments: [
          ...item.comments,
          {
            ...req.body,
            productId: Number(req.params.id),
            id: item.comments?.length + 1 || 1,
            date,
          },
        ],
      };
    return item;
  });
  res.json({
    ok: true,
    item: db.find((el) => el.id === Number(req.params.id)) || {},
  });
  res.status(200);
});

app.delete("/items/:id/comment/:commentId", cors(), (req, res) => {
  if (!(Number(req.params.id) && Number(req.params.commentId)))
    return res.status(500);
  db = db.map((item) => {
    if (Number(req.params.id) === item.id)
      return {
        ...item,
        comments: item.comments
          .filter((el) => el.id !== Number(req.params.commentId))
          .map((el, i) => ({
            ...el,
            id: i + 1,
            productId: item.id,
          })),
      };
    return item;
  });
  res.json({
    ok: true,
    item: db.find((el) => el.id === Number(req.params.id)) || {},
  });
  res.status(200);
});

app.delete("/items/:id", cors(), (req, res) => {
  db = db
    .filter((item) => item.id !== Number(req.params.id))
    .map((item, i) => ({ ...item, id: i + 1 }));
  res.json({ ok: true, items: db });
  res.status(200);
});

app.listen(3002);
