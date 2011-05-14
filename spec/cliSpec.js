require('../lib/jsgit-server')
var path = require('path')

var mockRunner = {show:function() {}, log:function() {}}

describe("--git-dir", function() {
  it("default should be the current working directory + .git", function() {
    var cli = new JsGit.Cli()
    
    expect(cli.gitDir).toEqual(path.join(process.cwd(), ".git"))
  })
  
  it("can specify a relative git dir", function() {
    var cli = new JsGit.Cli(["--git-dir=.."])
    
    expect(cli.gitDir).toEqual(path.join(process.cwd(), ".."))
  })
  
  it("can specify an absolute git dir", function() {
    var test_dir = path.join(process.cwd(), "..", "..")
    var cli = new JsGit.Cli(["--git-dir=" + test_dir])
    
    expect(cli.gitDir).toEqual(path.join(process.cwd(), "..", ".."))
  })
})

describe("show command", function() {
  it("should pass in commit ids ", function() {
    spyOn(mockRunner, 'show')
    var cli = new JsGit.Cli(["show", "123abc"], mockRunner)
    
    cli.run()
    
    expect(mockRunner.show).toHaveBeenCalled()
  })
})

describe("log command", function() {  
  it("should run the log command", function() {
    spyOn(mockRunner, 'log')
    var cli = new JsGit.Cli(["log"], mockRunner)
    
    cli.run()
    
    expect(mockRunner.log).toHaveBeenCalled()
  })
})