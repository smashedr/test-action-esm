import path from 'node:path'
import { fileURLToPath } from 'node:url'

import * as core from '@actions/core'
import * as exec from '@actions/exec'
// const github = require('@actions/github')

async function main() {
    const version = process.env.GITHUB_ACTION_REF
        ? `${process.env.GITHUB_ACTION_REF}`
        : 'Source'
    core.info(`🏳️ Starting Test Action 1 - \u001b[35;1m${version}`)

    // // Debug
    // core.startGroup('Debug: github.context')
    // console.log(github.context)
    // core.endGroup() // Debug github.context
    // core.startGroup('Debug: process.env')
    // console.log(process.env)
    // core.endGroup() // Debug process.env

    // Inputs
    const inputs = {
        token: core.getInput('token'),
        // token: core.getInput('token', { required: true }),
        multi: core.getMultilineInput('multi'),
    }
    core.startGroup('Inputs')
    console.log(inputs)
    core.endGroup() // Inputs

    // Path
    const __filename = fileURLToPath(import.meta.url)
    console.log(`__filename: ${__filename}`)
    const __dirname = path.dirname(__filename)
    console.log(`__dirname: ${__dirname}`)
    const srcPath = path.resolve(__dirname, '../src')
    console.log(`srcPath: ${srcPath}`)
    core.startGroup('ls srcPath')
    await exec.exec('ls', ['-lah', srcPath], { ignoreReturnCode: true })
    core.endGroup() // ls srcPath

    // Action
    core.startGroup('Action')
    await wait(1000 * 3)
    const results = inputs.multi
    console.log('results:', results)
    core.endGroup()

    // Outputs
    core.setOutput('results', results)

    core.info(`✅ \u001b[32;1mFinished Success`)
}

async function wait(timeout = 1000 * 3) {
    core.info(`setTimeout: ${timeout}`)
    await new Promise((resolve) => setTimeout(resolve, timeout))
    core.info('setTimeout: done')
}

// main()
// await main()

// main().catch((e) => {
//     core.debug(e)
//     core.info(e.message)
//     core.setFailed(e.message)
// })

try {
    await main()
} catch (e) {
    core.debug(e)
    core.info(e.message)
    core.setFailed(e.message)
}
