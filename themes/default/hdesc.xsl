<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <xsl:template match="/">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="//h1 | //h2">
    <xsl:element name="div">
      <xsl:attribute name="class">
        <xsl:call-template name="copyid"/>
        <xsl:text> hdesc</xsl:text>
      </xsl:attribute>
      <xsl:element name="div">
        <xsl:element name="{name()}">
          <xsl:copy-of select="@*"/>
          <xsl:element name="span">
            <xsl:value-of select="."/>
          </xsl:element>
        </xsl:element>
        <xsl:copy-of select="following-sibling::*[1][name() = 'p'][contains(@class, 'description')]"/>
      </xsl:element>
    </xsl:element>
    <xsl:if test="name()='h1'">
      <xsl:element name="div">
        <xsl:call-template name="topdiv"/>
      </xsl:element>
    </xsl:if>
  </xsl:template>

  <xsl:template name="topdiv">
    <xsl:param name="pos" select="1"/>
    <xsl:if test="following-sibling::*[$pos][not(contains(@class, 'section'))]">
      <xsl:if test="following-sibling::*[$pos][not(contains(@class, 'description'))]">
        <xsl:copy-of select="following-sibling::*[$pos]"/>
      </xsl:if>
      <xsl:call-template name="topdiv">
        <xsl:with-param name="pos" select="$pos+1"/>
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <!-- ignore elements between h1 and div.section -->
  <xsl:template match="//*[preceding-sibling::h1 and (following-sibling::div[contains(@class, 'section')] or not(//div[contains(@class, 'section')]))]"/>

  <xsl:template match="p[contains(@class, 'description')][preceding-sibling::*[1][name() = 'h1' or name() = 'h2']]"/>
  
  <xsl:template name="copyid">
    <xsl:choose>
      <xsl:when test="@id='steakgrill'">steakgrill</xsl:when>
      <xsl:when test="@id='jaroslav_honzajk'">jaroslav_honzajk</xsl:when>
      <xsl:when test="@id='o_nas'">about_us</xsl:when>
      <xsl:when test="@id='koncept'">concept</xsl:when>
      <xsl:when test="@id='steaky'">steaks</xsl:when>
      <xsl:when test="@id='video-archives'">video-archives</xsl:when>
      <xsl:when test="@id='nabidka'">menu</xsl:when>
      <xsl:when test="@id='denni_nabidka'">daily_offer</xsl:when>
      <xsl:when test="@id='akce'">weekend_events</xsl:when>
      <xsl:when test="@id='reference'">references</xsl:when>
      <xsl:when test="@id='staly_listek'">regular_menu</xsl:when>
      <xsl:when test="@id='napojovy_listek'">beverages</xsl:when>
      <xsl:when test="@id='vinny_listek'">wine_list</xsl:when>
      <xsl:when test="@id='kontakty'">contact</xsl:when>
      <xsl:when test="@id='novinky'">news</xsl:when>
      <xsl:when test="@id='contact_form'">contact_form</xsl:when>
      <xsl:when test="@id='dotazy'">questions</xsl:when>
      <xsl:when test="@id='napojovy_listek'">beverages</xsl:when>
      <xsl:when test="@id='alkoholicke'">alcoholic</xsl:when>
      <xsl:when test="@id='michane'">mixed</xsl:when>
      <xsl:when test="@id='nealkoholicke'">soft_drinks</xsl:when>
      <xsl:when test="@id='horke'">hot_drinks</xsl:when>
      <xsl:when test="@id='rumy'">rums</xsl:when>
      <xsl:when test="@id='destilaty'">spirits</xsl:when>
      <xsl:when test="@id='stala_nabidka'">regular_menu</xsl:when>
      <xsl:when test="@id='polevky'">soups</xsl:when>
      <xsl:when test="@id='hamburgery_a_testoviny'">hamburgers_and_pasta</xsl:when>
      <xsl:when test="@id='salatove_talire'">salads</xsl:when>
      <xsl:when test="@id='z_panve_fritezy_a_woku'">frying_pan_wok</xsl:when>
      <xsl:when test="@id='z_grilu_a_griddlu'">grill_griddle</xsl:when>
      <xsl:when test="@id='grilovane_steaky'">grilled_steaks</xsl:when>
      <xsl:when test="@id='sladkosti'">desserts</xsl:when>
      <xsl:when test="@id='detska_jidla'">kids_menu</xsl:when>
      <xsl:when test="@id='prilohy'">side_dishes</xsl:when>
      <xsl:when test="@id='pochutiny_omacky'">condiments_and_sauces</xsl:when>
      <xsl:when test="@id='informace'">information</xsl:when>
      <xsl:when test="@id='vinny_listek'">wine_list</xsl:when>
      <xsl:when test="@id='sekty'">sparkling_wines_and_prosecco</xsl:when>
      <xsl:when test="@id='rozlevana_vina'">house_wine</xsl:when>
      <xsl:when test="@id='bila_vina'">white_wines</xsl:when>
      <xsl:when test="@id='cervena_vina'">red_wines</xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>