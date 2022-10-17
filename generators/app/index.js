'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('underscore.string');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the luminous ${chalk.red('generator-vue-3-ts')} generator!`
      )
    );

    const prompts = [
      {
        type: 'list',
        name: 'vueVersion',
        message: 'What version of Vue would you like to use?',
        choices: ['2', '3'],
        default: '3',
      },
      {
        type: 'string',
        name: 'name',
        message: 'Enter a name for this Vue app',
        default: 'My Awesome Vue App',
      },
    ];

    return this.prompt(prompts).then(props => {
      props.title = _.titleize(props.name);
      props.slugged = _.slugify(props.name);
      this.destinationRoot(props.slugged);
      this.props = props;
    });
  }

  writing() {
    const isVue2 = this.props.vueVersion === '2';
    const prefix = isVue2 ? 'vue2' : 'vue3';
    this.fs.copyTpl(
      this.templatePath(`${prefix}/public/`),
      this.destinationPath('public/'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('rootfiles/'),
      this.destinationPath(''),
      this.props
    );
    this.fs.copy(this.templatePath('dotfiles/.*'), this.destinationPath(''));
    this.fs.copy(
      this.templatePath('.devcontainer/'),
      this.destinationPath('.devcontainer/')
    );
    this.fs.copy(this.templatePath('src/'), this.destinationPath('src/'));    
    this.fs.copyTpl(
      this.templatePath(`${prefix}/rootfiles/`),
      this.destinationPath(''),
      this.props
    );
    this.fs.copy(
      this.templatePath(`${prefix}/src/`),
      this.destinationPath('src/')
    );
    this.fs.copy(
      this.templatePath(`${prefix}/dotfiles/.*`),
      this.destinationPath('')
    );
  }

  install() {
    this.npmInstall();
  }
};
