# ST-to-IL-compiler [WIP]
Compiler that compiles ST source code to proprietary IL  

![CI](https://github.com/SheepCreativeSoftware/st-to-il-compiler/actions/workflows/ci.yml/badge.svg)
[![NPM Version](https://img.shields.io/npm/v/@sheepcs/st-to-il-compiler.svg)](https://www.npmjs.com/package/@sheepcs/st-to-il-compiler)
[![NPM Downloads](https://img.shields.io/npm/dt/@sheepcs/st-to-il-compiler.svg)](https://www.npmjs.com/package/@sheepcs/st-to-il-compiler)
[![GitHub](https://img.shields.io/github/license/SheepCreativeSoftware/st-to-il-compiler)](https://github.com/SheepCreativeSoftware/st-to-il-compiler)
[![node-lts](https://img.shields.io/node/v-lts/@sheepcs/st-to-il-compiler)](https://www.npmjs.com/package/@sheepcs/st-to-il-compiler)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?hosted_button_id=RG6PSXR828X94)

## Description
Node.JS based module fully written in TypeScript to verify and compile [ST source code](https://en.wikipedia.org/wiki/Structured_text) into a proprietary assembler dialect called IL.
The IL is used to run on a proprietary runtime environment.  
It does and will not support all language features of ST because of limitations on the target platform. All supported features will be described in the associated [wiki pages](https://github.com/SheepCreativeSoftware/ST-to-IL-compiler/wiki).  
As this project is work in progress, the supported language features will increase in future iterations.  

## Motivation
The motivation behind this project is to basically write a compiler as a learning experience.  
TypeScript is probably not the best language to write a compiler in, but I chose it because I wanted to gain more experience with it.
The project is also used to provide a way to write code for a proprietary runtime environment in a more modern high-level language like ST.
Maybe I do something similar in another language in the future.  
**Why ST?**  
Because it is a language that is widely used in the automation industry and is a good candidate for a compiler project.
The language is simple and still has a lot of features that are common in other languages.  
**Why IL?**  
Because it is a assemble dialect I'm very familiar with and besides that it is in some parts a very simple dialect.
But the simplicity of the dialect is also a challenge because it lacks some features that are common in other dialects or CPU architectures.

And at the end of the day, it provides me a way to write complex code for that proprietary runtime environment, which is easier to read and maintain.


## Installation
```bash
yarn global add @sheepcs/st-to-il-compiler
```

## Basic Usage
Commands are following this format:
```bash
st-to-il-compiler <command> [options]
```

### Get Help from Tool
Get a full list of commands

```bash
st-to-il-compiler --help
```

### Check the version
```bash
st-to-il-compiler --version
```

### Verify ST source code
You can verify the ST source code without compilation by running the following command:
```bash
st-to-il-compiler verify -f "path/to/st-file.st"
# or
st-to-il-compiler verify --file "path/to/st-file.st"
```

### Compile ST source code to IL
You can compile (this includes verification) the ST source code to IL by running the following command:
```bash
st-to-il-compiler compile -f "path/to/st-file.st"
# or
st-to-il-compiler compile --file "path/to/st-file.st"
```

## Language Documentation Reference
The language documentation is still in progress and will be available in the [wiki pages](https://github.com/SheepCreativeSoftware/ST-to-IL-compiler/wiki).

The reference documentation for ST is based on the [IEC 61131-3](https://en.wikipedia.org/wiki/IEC_61131-3) standard and the [PLCopen](https://plcopen.org/) standard.
As well as on  the document [Structured Text (ST) Programming](https://support.industry.siemens.com/cs/attachments/98990879/ST_Programming_en-US.pdf).

The reference documentation for IL is based on the [Instruction List (IL) manual](https://sbc-support.com/uploads/tx_srcproducts/26-733_EN_Manual_InstructionList_IL_PG521_01.pdf).


## License
Copyright (c) 2024 Marina Egner ([sheepcs.de](https://sheepcs.de)). This is free software and may be redistributed under the terms specified in the LICENSE file.
