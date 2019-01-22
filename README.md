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
$("#player").youtubePlayer();<br>
&lt;/script&gt;
</blockquote>

<h2>Options:</h2>
<p>By passing below parameters as object in function to set player(s) like as</p>
<blockquote>
&lt;script&gt;<br>
$("#player").youtubePlayer({<br>
&nbsp;&nbsp;&nbsp;&nbsp;autoplay: 1,<br>
&nbsp;&nbsp;&nbsp;&nbsp;loop: 1,<br>
&nbsp;&nbsp;&nbsp;&nbsp;width: 960<br>
});<br>
&lt;/script&gt;
</blockquote>
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
      <td>
        Initialize youtube video. The format of id is like <i><u>I4tVPj_o_zs</u></i><br>
        It is a priority to using value from attribute <i><u>data-video</u></i> of selector.
      </td>
    </tr>
    <tr>
      <th>listType</th>
      <td>string</td>
      <td>null</td>
      <td>
        Only supported with 'playlist', 'search', or 'user_uploads'.<br>
        Initialize type of youtube playlist.<br>
        It is a priority to using value from attribute <i><u>data-listtype</u></i> of selector.
      </td>
    </tr>
    <tr>
      <th>list</th>
      <td>string</td>
      <td>null</td>
      <td>
        Initialize youtube playlist.<br>
        It should be coupled with <b>listType</b> as:
        <ul>
          <li>playlist - youtube playlist id</li>
          <li>search - video keyword</li>
          <li>user_uploads - youtube user's channel id</li>
        </ul>
        It is a priority to using value from attribute <i><u>data-list</u></i> of selector.
      </td>
    </tr>
    <tr>
      <th>autoplay</th>
      <td>boolean</td>
      <td>0</td>
      <td>Autoplay while the player is ready.</td>
    </tr>
    <tr>
      <th>allowFullscreen</th>
      <td>boolean</td>
      <td>1</td>
      <td>Allow browser to fullscreen this player and add fullscreen button to player.</td>
    </tr>
    <tr>
      <th>controls</th>
      <td>boolean</td>
      <td>1</td>
      <td>Add controls bar to player.</td>
    </tr>
    <tr>
      <th>color</th>
      <td>string</td>
      <td>'red'</td>
      <td>
        Only supported with 'red' or 'white'.<br>
        The theme color of player.
      </td>
    </tr>
    <tr>
      <th>disableKeyboard</th>
      <td>boolean</td>
      <td>0</td>
      <td>Disable keyboard controlling.</td>
    </tr>
    <tr>
      <th>loop</th>
      <td>boolean</td>
      <td>0</td>
      <td>Loop after the video/playlist is finished.</td>
    </tr>
    <tr>
      <th>language</th>
      <td>string</td>
      <td>'zh-tw'</td>
      <td>
        Only supported with ISO 639-1 two-letter language code.<br>
        The language of player.
      </td>
    </tr>
    <tr>
      <th>modestbranding</th>
      <td>boolean</td>
      <td>0</td>
      <td>Hide youtube logo.</td>
    </tr>
    <tr>
      <th>showRelated</th>
      <td>boolean</td>
      <td>1</td>
      <td>Show related videos after video/playlist finished.</td>
    </tr>
    <tr>
      <th>width</th>
      <td>number</td>
      <td>640</td>
      <td>
        Should be positive integer.<br>
        Set the width pixels of player.
      </td>
    </tr>
    <tr>
      <th>ratio</th>
      <td>number</td>
      <td>16/9</td>
      <td>Set the width/height ratio of player.</td>
    </tr>
    <tr>
      <th>playsinline</th>
      <td>boolean</td>
      <td>0</td>
      <td>
        Let the video inline on mobile devices.<br>
        If false, the video will automatically fullscreen when playing.
      </td>
    </tr>
    <tr>
      <th>startSeconds</th>
      <td>number</td>
      <td>0</td>
      <td>
        Should be positive number.<br>
        Set the starting second(s) of video.<br>
        If the number is more than the video duration, it will go to the end.
      </td>
    </tr>
    <tr>
      <th>endSeconds</th>
      <td>number</td>
      <td>0</td>
      <td>
        Should be positive number.<br>
        Set the end second(s) of video.<br>
        If 0, it will play whole video to the end.
      </td>
    </tr>
    <tr>
      <th>origin</th>
      <td>string</td>
      <td>window.location.origin</td>
      <td>Set your website domain.</td>
    </tr>
  </tbody>
</table>

<h2>Events:</h2>
<p>You can call function by listening below events like as</p>
<blockquote>
$("#player").youtubePlayer({<br>
&nbsp;&nbsp;&nbsp;&nbsp;events: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onReady: function(element) {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log("player is on ready.");<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
&nbsp;&nbsp;&nbsp;&nbsp;}<br>
});
</blockquote>
<table>
  <thead>
    <tr>
      <th>Event</th>
      <th>Return parameters</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>onReady</th>
      <td>element</td>
      <td>Call after player iframe is ready.</td>
    </tr>
    <tr>
      <th>onPlay</th>
      <td>element</td>
      <td>Call when video plays.</td>
    </tr>
    <tr>
      <th>onPause</th>
      <td>element</td>
      <td>Call when video pauses.</td>
    </tr>
    <tr>
      <th>onBuffering</th>
      <td>element</td>
      <td>Call when video is buffering.</td>
    </tr>
    <tr>
      <th>onEnd</th>
      <td>element</td>
      <td>Call when every single video ends.</td>
    </tr>
    <tr>
      <th>onCued</th>
      <td>element, object</td>
      <td>
        Call when video/playlist is cued.<br>
        Return object with <i><u>playlist</u></i>, <i><u>playlistId</u></i>, <i><u>playlistIndex</u></i>, and <i><u>videoId</u></i>.
      </td>
    </tr>
    <tr>
      <th>onStateChange</th>
      <td>element, number</td>
      <td>
        Call when state of video changes.<br>
        Return number with:
        <ul>
          <li>-1 - unstarted</li>
          <li>0 - ended</li>
          <li>1 - playing</li>
          <li>2 - paused</li>
          <li>3 - buffering</li>
          <li>5 - video/playlist cued</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th>onQualityChange</th>
      <td>element, string</td>
      <td>
        Call when quality of video changes.<br>
        Return string with:
        <ul>
          <li>small - 240p</li>
          <li>medium - 360p</li>
          <li>large - 480p</li>
          <li>hd720 - 720p</li>
          <li>hd1080 - 1080p</li>
          <li>highres - resolution more than 1080p</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th>onRateChange</th>
      <td>element, number</td>
      <td>
        Call when playback rate of video changes.<br>
        Return float number of current rate.
      </td>
    </tr>
    <tr>
      <th>onError</th>
      <td>element, number</td>
      <td>
        Call when an error occurs.<br>
        Return number with
        <ul>
          <li>2 - video is not found or wrong id</li>
          <li>5 - HTML player is wrong</li>
          <li>100 - video is removed or private by owner</li>
          <li>101 - video is not allowed be embed by owner</li>
          <li>150 - same as code 101</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th>onVideoNotFound</th>
      <td>element</td>
      <td>Call when video is not found.</td>
    </tr>
    <tr>
      <th>onVideoPrivate</th>
      <td>element</td>
      <td>Call when video is removed or private.</td>
    </tr>
    <tr>
      <th>onVideoNotEmbed</th>
      <td>element</td>
      <td>Call when video is not allowed be embed.</td>
    </tr>
  </tbody>
</table>
