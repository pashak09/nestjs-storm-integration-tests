# NestJS Integration Test Sample

Do you think running integration tests is a pain and takes a lot of time waiting for the testing stage to
complete? Let me give you a little hint on how you can change that. I'll show you how to run around **3,000** tests in
**~2** minutes. You can take a look at the pipeline .

The repository serves as an example of how to run integration tests. **Here, you won't find examples of building the
application structure or any accepted coding practices**. The purpose of this repository is to present my approach to
running integration tests for developers of different seniority levels who use NestJS and TypeORM.

The tested application is a simple service with CRUD operations, and we will be testing the app integration
with the database. **All CRUD operation examples are illustrative and kept as simple as possible**. They do not
address issues of data consistency, atomicity, and other nuances involved in developing modern applications to avoid
overcomplicating the application. Once again, **I emphasize that the goal is not to present coding practices but to
show the idea of running tests**.

The main effort in running tests goes into:

- Initializing the application;
- Preparing the state;
- Managing the state.

In this application, I have tried to minimize these efforts. In the test environment, the application is started only
once, and all test cases are wrapped in a transaction to manage the state of the database.

Of course, the time spent on running tests will vary since in this example, we are testing on a database with a minimal
number of records. However, you can contribute to this repository to make it more realistic.

If you liked this implementation, don't forget to put your **★** to this project.

To clone the repository:

```bash
git clone 
```

To install the packages:

```bash
yarn install
```

To generate tests:

```bash
yarn tests-duplicator
```

Run database container

```bash
docker-compose -f docker-compose.test.yml up -d
```

To run the tests:

```bash
yarn test:integration
```
