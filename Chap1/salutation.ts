interface IMessageWriter {
    write(message: string): void;
}

class ConsoleMessageWriter implements IMessageWriter {
    public write(message: string) {
        console.log(message);
    }
}

class ArgumentError extends Error { }

class Salutation {
    writer: IMessageWriter;

    constructor(writer: IMessageWriter) {
        if (writer === null) {
            throw new ArgumentError();
        }
        this.writer = writer;
    }

    public exclaim() {
        this.writer.write("Hello, DI!");
    }
}


function main() {
    const writer: IMessageWriter = new ConsoleMessageWriter();
    const salutation: Salutation = new Salutation(writer);
    salutation.exclaim();
}

main();