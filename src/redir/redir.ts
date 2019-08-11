import * as lodash from 'lodash';
import moment from 'moment-timezone';
import fetch from 'redir-core/lib/redir/result/fetch';
import netrc from 'netrc';
import { Context, Redir, ScriptOptions } from 'redir-core';
import { flatten } from 'lodash';

export const redir = new Redir();

redir.contextProcessors.push((context: Context, options: ScriptOptions) => {
  context._ = lodash;
  context.moment = moment;
});

redir.contextProcessors.push((context: Context, options: ScriptOptions) => {
  if ("netrc" in options) {
    const logins = flatten([options.netrc]),
      myNetrc = netrc();

    context.netrc = {};
    for (const name of logins) {
      // debug("loading credentials for:", name);
      context.netrc[name] = myNetrc[name];
    }
  }
});

redir.resultProcessors.push(fetch);
