import mongoose from 'mongoose';

export class Database {

    connect(uri : string) {
        if (this.database) {
            return;
        }
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        this.database = mongoose.connection;
        this.database.once("open", async () => {
            console.log("Connected to database");
        });
        this.database.on("error", () => {
            console.log("Error connecting to database");
        });
	}

	async drop() {
		if (this.database) {
			await this.database.dropDatabase();
		}
	}

    disconnect() {
        if (!this.database) {
            return;
        }
        mongoose.disconnect();        
    }
    private database: mongoose.Connection | undefined;
}
