## Running the application

1. Clone this repository.

2. Inside the repository folder, build the docker image.

```
docker build -t lwn-str . 
```

3. Run the docker image.

```
docker run -p 3000:3000 lwn-str
```

4. Visit `http://localhost:3000`.
