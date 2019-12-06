<?xml version= "1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.orgç1999/XSL/Transform">
<xsl:template match="/">

<!--  //this code was adapted from Mikhail's code at: https://github.com/mikhail-cct/CA1-In-class-Demo  -->
<table id="menuTable" class="indent table-hover">

    
                    <thead>
                        <tr>
                            <th colspan="5">Florence and the Machine Discography</th>
                        </tr>
                        <tr>
                            <th>Select</th>
                            <th>CD title</th>
                            <th>Cover</th>
                            <th>Year of Release</th>
                            <th>Price</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        <xsl:for-each select="florenceDiscography">
                            <tr>
                                <td colspan="5">
                                    <xsl:value-of select="@name" />
                                </td>
                            </tr>
                            <xsl:for-each select="cd">
                                <tr id="{position()}">
                                    <xsl:attribute name="live">
                                        <xsl:value-of select="boolean(./@live)" />
                                    </xsl:attribute>
                                    <td align="center">
                                        <input name="item0" type="checkbox" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="title" />
                                    </td>
                                    <td align="right">
                                        <xsl:variable name="link"  />
                                        <img src="{$link}" class="igm-thumbnail" width="100" height="100"/>
                                    </td>
                                    <td align="right">
                                        <xsl:value-of select="yearOfRelease" />
                                    </td>
                                    <td align="right">
                                        <xsl:value-of select="price" />
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </xsl:for-each>
                    </tbody>
                </table>
                <form class="indent">
                    <!-- button to calculate the bill -->
                    <p>
                        <input type="button" name="btnCalcBill" value="Calculate Bill" id="calcBill" />
				Total: €
				<input type="text" name="txtBillAmt" /><input type="checkbox" name="cbOpts" value="isLive" id="showLive" /><label for="showLive">Show Live cds</label></p>
                </form>
                
    </xsl:template>
</xsl:stylesheet>