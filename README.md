# Youtube-Player

Must include jQuery library 1.9+ front of this script.<br>
See detail using demo at https://codepen.io/britz/pen/zeOozK

<h2>How to use:</h2>
<p>Include below javascript files:</p>
<ul>
  <li>jQuery library 1.9+</li>
  <li>jquery.youtubePlayer.js</li>
</ul>
<p>Edit html code as</p>
<blockquote>&lt;div id="player"&gt;&lt;/div&gt;</blockquote>
<p>You can pass youtube video id parameter by attribute</p>
<blockquote>&lt;div id="player" data-video="Hze1SyktHa4"&gt;&lt;/div&gt;</blockquote>
<p>Or you can pass youtube playlist id parameter</p>
<blockquote>&lt;div id="player" data-listtype="playlist" data-list="PLE7ntAe3YYzZtGKd3Db4xo95P6G63MHqb"&gt;&lt;/div&gt;</blockquote>
<p>Then call youtube-player function in script</p>
<blockquote>
&lt;script&gt;<br>
&nbsp;&nbsp;$("#player").youtubePlayer();<br>
&lt;/script&gt;
</blockquote>

<h2>Options:</h2>
<p>By passing below parameters as object in function to set player(s).</p>
<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Value</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>videoId</th>
      <td>string</td>
      <td>null</td>
      <td>Initialize youtube video. The format of id is https://www.youtube.com/watch?v=<strong>I4tVPj_o_zs</strong></td>
    </tr>
  </tbody>
</table>
